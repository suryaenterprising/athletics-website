import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ProfileForm() {
const [searchParams] = useSearchParams();
const defaultType = searchParams.get("category") || "students";

const [form, setForm] = useState({
name: "",
department: "",
events: "",
achievements: "",
type: defaultType,
photo: null,
});

useEffect(() => {
setForm((prev) => ({ ...prev, type: defaultType }));
}, [defaultType]);

const handleSubmit = async (e) => {
e.preventDefault();
const data = new FormData();
data.append("name", form.name);
data.append("department", form.department);
data.append("events", form.events);
data.append("achievements", form.achievements);
data.append("type", form.type);
data.append("photo", form.photo);


try {
  await axios.post("https://your-backend-url.com/api/athletes", data);
  alert("Profile submitted!");
} catch (err) {
  console.error(err);
  alert("Error submitting profile");
}
};

return (
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Name"
onChange={(e) => setForm({ ...form, name: e.target.value })}
required
/>
<input
type="text"
placeholder="Department"
onChange={(e) => setForm({ ...form, department: e.target.value })}
required
/>
<input
type="text"
placeholder="Events (comma-separated)"
onChange={(e) => setForm({ ...form, events: e.target.value })}
required
/>
<textarea
placeholder="Achievements"
onChange={(e) => setForm({ ...form, achievements: e.target.value })}
required
/>
<select
value={form.type}
onChange={(e) => setForm({ ...form, type: e.target.value })}
>
<option value="students">Student</option>
<option value="alumni">Alumni</option>
<option value="coaches">Coach</option>
</select>
<input
type="file"
onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
required
/>
<button type="submit">Submit Profile</button>
</form>
);
}