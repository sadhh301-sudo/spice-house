import React, { useEffect, useState } from "react";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // SELECTED BOOKING FOR POPUP
  const [selectedBooking, setSelectedBooking] = useState(null);

  // ===============================
  // FETCH BOOKINGS
  // ===============================

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/bookings"
      );

      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ===============================
  // UPDATE BOOKING STATUS
  // ===============================

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Booking status updated successfully ✅");

        setBookings((previousBookings) =>
          previousBookings.map((booking) =>
            booking._id === id
              ? { ...booking, status }
              : booking
          )
        );

        // Popup open ah irundha status update aagum
        setSelectedBooking((previous) =>
          previous && previous._id === id
            ? { ...previous, status }
            : previous
        );
      } else {
        alert(data.message || "Status update failed");
      }
    } catch (error) {
      console.error("Status update error:", error);
      alert("Server connection failed");
    }
  };

  // ===============================
  // DELETE BOOKING
  // ===============================

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Booking deleted successfully ✅");

        setBookings((previousBookings) =>
          previousBookings.filter(
            (booking) => booking._id !== id
          )
        );

        // Deleted booking popup open ah irundha close pannum
        if (selectedBooking?._id === id) {
          setSelectedBooking(null);
        }
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server connection failed");
    }
  };

  // ===============================
  // SEARCH + STATUS FILTER
  // ===============================

  const filteredBookings = bookings.filter((booking) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      booking.name
        ?.toLowerCase()
        .includes(searchText) ||
      booking.email
        ?.toLowerCase()
        .includes(searchText) ||
      booking.date
        ?.toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === "ALL" ||
      (booking.status || "Pending") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ===============================
  // DASHBOARD CALCULATIONS
  // ===============================

  const totalBookings = bookings.length;

  const totalGuests = bookings.reduce(
    (total, booking) =>
      total + Number(booking.guests || 0),
    0
  );

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const todayBookings = bookings.filter(
    (booking) => booking.date === today
  ).length;

  const pendingBookings = bookings.filter(
    (booking) =>
      (booking.status || "Pending") === "Pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  // ===============================
  // STATUS CLASS
  // ===============================

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-confirmed";

      case "Completed":
        return "status-completed";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };

  return (
    <div className="admin-page">

      {/* ===============================
          SIDEBAR
      =============================== */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>SPICE HOUSE</h2>
          <span>ADMIN PANEL</span>
        </div>

        <div className="sidebar-menu">

          <a href="/admin" className="active">
            📊 Dashboard
          </a>

          <a href="/admin">
            📅 Bookings
          </a>

          <a href="/">
            🏠 Restaurant
          </a>

        </div>

      </aside>

      {/* ===============================
          MAIN CONTENT
      =============================== */}

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-header">

          <div>

            <p className="admin-small-title">
              SPICE HOUSE MANAGEMENT
            </p>

            <h1>Booking Dashboard</h1>

            <p>
              Manage your restaurant reservations
              easily from one place.
            </p>

          </div>

          <button
            className="admin-refresh"
            onClick={fetchBookings}
          >
            ↻ Refresh
          </button>

        </div>

        {/* ===============================
            DASHBOARD CARDS
        =============================== */}

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="card-icon">📅</div>

            <div>
              <span>Total Bookings</span>
              <h2>{totalBookings}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🕐</div>

            <div>
              <span>Today's Bookings</span>
              <h2>{todayBookings}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👥</div>

            <div>
              <span>Total Guests</span>
              <h2>{totalGuests}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🟡</div>

            <div>
              <span>Pending</span>
              <h2>{pendingBookings}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🟢</div>

            <div>
              <span>Confirmed</span>
              <h2>{confirmedBookings}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🔵</div>

            <div>
              <span>Completed</span>
              <h2>{completedBookings}</h2>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🔴</div>

            <div>
              <span>Cancelled</span>
              <h2>{cancelledBookings}</h2>
            </div>
          </div>

        </div>

        {/* ===============================
            BOOKINGS SECTION
        =============================== */}

        <section className="bookings-section">

          <div className="section-header">

            <div>
              <h2>Recent Bookings</h2>

              <p>
                All customer table reservations
              </p>
            </div>

            <div className="status-filter">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="status-dropdown"
              >
                <option value="ALL">
                  All Statuses
                </option>

                <option value="Pending">
                  🟡 Pending
                </option>

                <option value="Confirmed">
                  🟢 Confirmed
                </option>

                <option value="Completed">
                  🔵 Completed
                </option>

                <option value="Cancelled">
                  🔴 Cancelled
                </option>
              </select>

              <input
                type="text"
                placeholder="🔍 Search bookings..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="booking-search"
              />

            </div>

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="empty-state">
              <h3>Loading bookings...</h3>
            </div>

          ) : filteredBookings.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                📭
              </div>

              <h3>
                No bookings found
              </h3>

              <p>
                Customer bookings will appear here.
              </p>

            </div>

          ) : (

            <div className="table-wrapper">

              <table className="booking-table">

                <thead>

                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredBookings.map(
                    (booking) => (

                      <tr key={booking._id}>

                        {/* CUSTOMER */}

                        <td>

                          <div className="customer">

                            <div className="customer-avatar">

                              {booking.name
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>
                              {booking.name}
                            </strong>

                          </div>

                        </td>

                        {/* EMAIL */}

                        <td>
                          {booking.email}
                        </td>

                        {/* DATE */}

                        <td>

                          <span className="date-badge">
                            📅 {booking.date}
                          </span>

                        </td>

                        {/* TIME */}

                        <td>
                          ⏰ {booking.time}
                        </td>

                        {/* GUESTS */}

                        <td>

                          <span className="guest-badge">
                            👥 {booking.guests}
                          </span>

                        </td>

                        {/* STATUS */}

                        <td>

                          <select
                            value={
                              booking.status ||
                              "Pending"
                            }
                            onChange={(e) =>
                              updateBookingStatus(
                                booking._id,
                                e.target.value
                              )
                            }
                            className={`status-dropdown ${getStatusClass(
                              booking.status ||
                                "Pending"
                            )}`}
                          >

                            <option value="Pending">
                              🟡 Pending
                            </option>

                            <option value="Confirmed">
                              🟢 Confirmed
                            </option>

                            <option value="Completed">
                              🔵 Completed
                            </option>

                            <option value="Cancelled">
                              🔴 Cancelled
                            </option>

                          </select>

                        </td>

                        {/* ACTION */}

                        <td>

                          <div className="action-buttons">

                            {/* VIEW BUTTON */}

                            <button
                              className="view-btn"
                              onClick={() =>
                                setSelectedBooking(
                                  booking
                                )
                              }
                            >
                              👁 View
                            </button>

                            {/* DELETE BUTTON */}

                            <button
                              className="delete-btn"
                              onClick={() =>
                                deleteBooking(
                                  booking._id
                                )
                              }
                            >
                              🗑 Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* ===============================
            FOOTER
        =============================== */}

        <footer className="admin-footer">

          <span>
            © 2026 Spice House Admin
          </span>

          <span>
            Restaurant Management System
          </span>

        </footer>

      </main>

      {/* ===============================
          BOOKING DETAILS POPUP
      =============================== */}

      {selectedBooking && (

        <div
          className="booking-details-overlay"
          onClick={(e) => {

            if (
              e.target.className ===
              "booking-details-overlay"
            ) {
              setSelectedBooking(null);
            }

          }}
        >

          <div className="booking-details-popup">

            {/* CLOSE */}

            <button
              className="booking-details-close"
              onClick={() =>
                setSelectedBooking(null)
              }
            >
              ×
            </button>

            {/* HEADER */}

            <div className="booking-details-header">

              <div className="booking-details-icon">
                📅
              </div>

              <div>

                <h2>
                  Booking Details
                </h2>

                <p>
                  Spice House Reservation
                </p>

              </div>

            </div>

            {/* DETAILS */}

            <div className="booking-details-body">

              <div className="detail-item">
                <span>
                  👤 Customer Name
                </span>

                <strong>
                  {selectedBooking.name}
                </strong>
              </div>

              <div className="detail-item">
                <span>
                  📧 Email
                </span>

                <strong>
                  {selectedBooking.email}
                </strong>
              </div>

              <div className="detail-item">
                <span>
                  📅 Date
                </span>

                <strong>
                  {selectedBooking.date}
                </strong>
              </div>

              <div className="detail-item">
                <span>
                  ⏰ Time
                </span>

                <strong>
                  {selectedBooking.time}
                </strong>
              </div>

              <div className="detail-item">
                <span>
                  👥 Guests
                </span>

                <strong>
                  {selectedBooking.guests}
                </strong>
              </div>

              <div className="detail-item">

                <span>
                  🔘 Status
                </span>

                <span
                  className={`popup-status ${getStatusClass(
                    selectedBooking.status ||
                      "Pending"
                  )}`}
                >
                  {selectedBooking.status ||
                    "Pending"}
                </span>

              </div>

            </div>

            {/* CLOSE BUTTON */}

            <button
              className="close-details-btn"
              onClick={() =>
                setSelectedBooking(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminBookings;