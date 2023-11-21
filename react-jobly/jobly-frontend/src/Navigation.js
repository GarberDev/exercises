function Navigation({ currentUser, logout }) {
  return (
    <nav>
      {currentUser ? (
        <>
          <span>{currentUser.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;
