
<>
  <div className="collector-layout">

    {/* SIDEBAR */}
    <aside className="collector-sidebar">
      <div className="sidebar-brand">♻ EcoCycle</div>

      <p className="sidebar-label">WORKSPACE</p>

      <button className="sidebar-link active">
        ▦ Overview
      </button>

      <button
        className="sidebar-link"
        onClick={() => document.getElementById("available-pickups")?.scrollIntoView({ behavior: "smooth" })}
      >
        ◷ Pickup Requests
      </button>

      <button
        className="sidebar-link"
        onClick={() => document.getElementById("active-pickups")?.scrollIntoView({ behavior: "smooth" })}
      >
        🚚 Active Collections
      </button>

      <button
        className="sidebar-link"
        onClick={() => document.getElementById("collection-history")?.scrollIntoView({ behavior: "smooth" })}
      >
        ✓ Collection History
      </button>

      <div className="sidebar-bottom">
        <div className="collector-profile">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <strong>{user.name}</strong>
            <small>Verified Collector</small>
          </div>
        </div>
      </div>
    </aside>

    {/* MAIN CONTENT */}
    <div className="collector-content">

      <div className="collector-topbar">
        <div>
          <span className="eyebrow">COLLECTOR WORKSPACE</span>
          <h1>Dashboard Overview</h1>
          <p className="muted">
            Manage your e-waste pickups and track your collection impact.
          </p>
        </div>

        <div className="collector-date">
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </div>
      </div>

      {/* STATISTICS */}
      <div className="collector-stats">

        <div className="collector-stat purple-stat">
          <span>📦</span>
          <p>Total Requests</p>
          <h2>{requests.length}</h2>
          <small>All consumer requests</small>
        </div>

        <div className="collector-stat orange-stat">
          <span>⏳</span>
          <p>Pending Requests</p>
          <h2>{availableRequests.length}</h2>
          <small>Awaiting acceptance</small>
        </div>

        <div className="collector-stat blue-stat">
          <span>🚚</span>
          <p>Active Pickups</p>
          <h2>
            {myCollectorRequests.filter(
              r => r.status === "Accepted"
            ).length}
          </h2>
          <small>Assigned to you</small>
        </div>

        <div className="collector-stat green-stat">
          <span>✓</span>
          <p>Completed</p>
          <h2>
            {myCollectorRequests.filter(
              r => r.status === "Completed"
            ).length}
          </h2>
          <small>Successfully collected</small>
        </div>

      </div>

      {/* IMPACT SECTION */}
      <div className="collector-impact">
        <div>
          <span className="eyebrow">YOUR ENVIRONMENTAL CONTRIBUTION</span>
          <h2>Making a measurable difference 🌱</h2>
          <p>
            Track the e-waste collected through your work.
          </p>
        </div>

        <div className="impact-number">
          <h2>
            {myCollectorRequests
              .filter(r => r.status === "Completed")
              .reduce((sum, r) => sum + r.co2, 0)
              .toFixed(1)} kg
          </h2>
          <span>Estimated CO₂ impact</span>
        </div>

        <div className="impact-number">
          <h2>
            {myCollectorRequests
              .filter(r => r.status === "Completed")
              .reduce((sum, r) => sum + r.weight, 0)
              .toFixed(1)} kg
          </h2>
          <span>E-waste collected</span>
        </div>
      </div>

      {/* AVAILABLE REQUESTS */}
      <section className="collector-section" id="available-pickups">
        <div className="section-heading">
          <div>
            <h2>New Pickup Requests</h2>
            <p>Review and accept incoming collection requests.</p>
          </div>
          <span className="request-count">
            {availableRequests.length} Available
          </span>
        </div>

        {availableRequests.length === 0 ? (
          <Empty text="No new pickup requests available." />
        ) : (
          availableRequests.map(r => (
            <div className="collector-request" key={r.id}>
              <div className="request-icon">♻</div>

              <div className="collector-request-info">
                <div className="request-top">
                  <h3>{r.category}</h3>
                  <span className="status pending">Pending</span>
                </div>

                <p>Consumer: {r.consumerName}</p>
                <p>Weight: {r.weight} kg</p>
                <p>Estimated CO₂: {r.co2} kg</p>
                <p>Pickup: {r.address}</p>
                <small>
                  {new Date(r.createdAt).toLocaleString()}
                </small>
              </div>

              <div className="collector-request-actions">
                <button
                  className="outline-btn"
                  onClick={() => openMap(r)}
                >
                  View Location
                </button>

                <button onClick={() => acceptRequest(r)}>
                  Accept Pickup
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* ACTIVE COLLECTIONS */}
      <section className="collector-section" id="active-pickups">
        <div className="section-heading">
          <div>
            <h2>Active Collections</h2>
            <p>Manage the pickups assigned to you.</p>
          </div>
        </div>

        {myCollectorRequests.filter(
          r => r.status === "Accepted"
        ).length === 0 ? (
          <Empty text="You have no active collections." />
        ) : (
          myCollectorRequests
            .filter(r => r.status === "Accepted")
            .map(r => (
              <div className="collector-request" key={r.id}>
                <div className="request-icon">🚚</div>

                <div className="collector-request-info">
                  <h3>{r.category}</h3>
                  <p>Consumer: {r.consumerName}</p>
                  <p>Pickup: {r.address}</p>
                  <p>Weight: {r.weight} kg</p>
                  <span className="status accepted">Accepted</span>
                </div>

                <div className="collector-request-actions">
                  <button
                    className="outline-btn"
                    onClick={() => openMap(r)}
                  >
                    View Location
                  </button>

                  <button
                    className="complete-btn"
                    onClick={() => completeRequest(r)}
                  >
                    Mark Completed
                  </button>
                </div>
              </div>
            ))
        )}
      </section>

      {/* HISTORY */}
      <section className="collector-section" id="collection-history">
        <div className="section-heading">
          <div>
            <h2>Collection History</h2>
            <p>Your successfully completed collections.</p>
          </div>
        </div>

        {myCollectorRequests.filter(
          r => r.status === "Completed"
        ).length === 0 ? (
          <Empty text="Your completed collections will appear here." />
        ) : (
          myCollectorRequests
            .filter(r => r.status === "Completed")
            .map(r => (
              <div className="collector-request" key={r.id}>
                <div className="request-icon">✓</div>

                <div className="collector-request-info">
                  <h3>{r.category}</h3>
                  <p>Consumer: {r.consumerName}</p>
                  <p>Weight: {r.weight} kg</p>
                  <p>CO₂ estimate: {r.co2} kg</p>
                </div>

                <span className="status completed">
                  Completed
                </span>
              </div>
            ))
        )}
      </section>

    </div>
  </div>
</>
