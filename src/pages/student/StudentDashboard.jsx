import { useNavigate } from "react-router-dom";

/* ---------------- MOCK DATA ---------------- */

const STUDENT = {
  name: "Jane Doe",
  rollNo: "S2023045",
  overallAttendance: 78,
  defaulterStatus: "Warning",
  rewardsPoints: 120,
  streak: 5,
  avatar: "JD",
  avatarColor: "bg-indigo-400",
};

const SUBJECTS = [
  { name: "Web Dev Basics", code: "WD101", attendance: 72 },
  { name: "Data Structures", code: "CS201", attendance: 81 },
  { name: "DBMS", code: "CS301", attendance: 88 },
];

const RECENT_ACTIVITY = [
  { subject: "Web Dev Basics", date: "10 Sep", time: "10:00 AM", status: "Absent" },
  { subject: "DBMS", date: "9 Sep", time: "1:00 PM", status: "Present" },
];

const ATTENDANCE_TREND = [60, 70, 80, 75, 85, 90, 78];

const UPCOMING_CLASSES = [
  { subject: "Web Dev Basics", time: "Tomorrow 10:00 AM", room: "Lab 3" },
  { subject: "DBMS", time: "Friday 1:00 PM", room: "Room 12" },
];

/* ---------------- HELPERS ---------------- */

const getColor = (value) => {
  if (value < 75) return "text-red-700 bg-red-100";
  if (value < 85) return "text-yellow-700 bg-yellow-100";
  return "text-green-700 bg-green-100";
};

/* ---------------- COMPONENT ---------------- */

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b">
        <h1 className="text-3xl font-extrabold text-blue-800">
          PresenX Student Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <div className={`w-9 h-9 rounded-full ${STUDENT.avatarColor} flex items-center justify-center text-white font-bold`}>
            {STUDENT.avatar}
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Metric title="Overall Attendance" value={`${STUDENT.overallAttendance}%`} color={getColor(STUDENT.overallAttendance)} />
        <Metric title="Defaulter Status" value={STUDENT.defaulterStatus} color="text-yellow-700 bg-yellow-100" />
        <Metric title="Reward Points" value={STUDENT.rewardsPoints} color="text-indigo-700 bg-indigo-100" />
        <Metric title="Streak" value={`${STUDENT.streak} Days 🔥`} color="text-green-700 bg-green-100" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Card title="Subject-wise Attendance" className="lg:col-span-2">
          {SUBJECTS.map((s, i) => (
            <div key={i} className="flex justify-between border-b py-3">
              <span>{s.name} ({s.code})</span>
              <span className={`px-3 py-1 rounded ${getColor(s.attendance)}`}>
                {s.attendance}%
              </span>
            </div>
          ))}
        </Card>

        <Card title="Recent Attendance">
          {RECENT_ACTIVITY.map((a, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">{a.subject}</p>
              <p className="text-xs text-gray-500">
                {a.date} • {a.time} • {a.status}
              </p>
            </div>
          ))}
        </Card>

        <Card title="7-Day Attendance Trend" className="lg:col-span-2">
          <div className="flex items-end gap-2 h-32">
            {ATTENDANCE_TREND.map((v, i) => (
              <div key={i} className="flex-1 bg-blue-200 rounded">
                <div className="bg-blue-600 rounded" style={{ height: `${v}%` }} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Classes">
          {UPCOMING_CLASSES.map((c, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{c.subject}</p>
              <p className="text-xs text-gray-500">{c.time} • {c.room}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl shadow ${className}`}>
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Metric = ({ title, value, color }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-xs text-gray-500">{title}</p>
    <p className={`text-xl font-bold mt-1 inline-block px-3 py-1 rounded ${color}`}>
      {value}
    </p>
  </div>
);

export default StudentDashboard;
