import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const [image, setImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const { username, password, passwordConf } = formData;

  function handleChange(event) {
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);
      if (image) data.append("image", image);

      await signUp(data);
      // await signUp(formData);
      navigate("/sign-in");
    } catch (err) {
      setError(err.response.data.message);
      setSubmitting(false);
    }
  }

  function isFormInvalid() {
    return !(username && password && password === passwordConf);
  }

  return (
  <main className="signup-page">
    <h1 className="signup-title">Create Account</h1>

    <p className="signup-error">{error}</p>

    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-field">
        <label htmlFor="username">Username:</label>
        <input
          className="signup-input"
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-field">
        <label htmlFor="password">Password:</label>
        <input
          className="signup-input"
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-field">
        <label htmlFor="confirm">Confirm Password:</label>
        <input
          className="signup-input"
          type="password"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-field">
        <label htmlFor="image">Profile Picture:</label>
        <input
          className="signup-image"
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files[0] ?? null)}
        />
      </div>

      <div className="signup-buttons">
        <button
          type="submit"
          className="signup-submit"
          disabled={isFormInvalid() || submitting}
        >
          {submitting ? "Signing up..." : "Sign Up"}
        </button>
      </div>

      <p className="signup-signin">
        Already have an account?{" "}
        <span onClick={() => navigate("/sign-in")}>
          Sign In
        </span>
      </p>
    </form>
  </main>
);
}
export default Signup;
