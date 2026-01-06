import React, { useState, useMemo } from "react";
import {
  Calendar,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

function TeacherDashboard() {
  /* ---------------- MOCK CLASSES ---------------- */

  const [classes] = useState([
    {
      id: 1,
      name: "Class 10-A",
      subject: "Mathematics",
      section: "A",
      totalStudents: 40,
      schedule: "Mon, Wed, Fri • 9:00 AM",
      room: "Lab 5",
      defaulters: 6,
      weeklyAvg: 82,
    },
    {
      id: 2,
      name: "Class 10-B",
      subject: "Physics",
      section: "B",
      totalStudents: 38,
      schedule: "Tue, Thu • 11:00 AM",
      room: "Lab 3",
      defaulters: 9,
      weeklyAvg: 76,
    },
    {
      id: 3,
      name: "Class 9-A",
      subject: "English",
      section: "A",
      totalStudents: 35,
      schedule: "Mon, Wed, Fri • 2:00 PM",
      room: "Room 12",
      defaulters: 4,
      weeklyAvg: 88,
    },
  ]);

  /* ---------------- MOCK ATTENDANCE ---------------- */

  const [attendanceData] = useState({
    1: [
      { id: 1, name: "Om Kane", rollNo: "001", present: true, percentage: 89 },
      { id: 2, name: "Priya Singh", rollNo: "002", present: true, percentage: 92 },
      { id: 3, name: "Raj Patel", rollNo: "003", present: false, percentage: 68 },
      { id: 4, name: "Isha Sharma", rollNo: "004", present: true, percentage: 84 },
      { id: 5, name: "Neha Gupta", rollNo: "005", present: false, percentage: 71 },
    ],
    2: [
      { id: 1, name: "Akshay Reddy", rollNo: "001", present: true, percentage: 78 },
      { id: 2, name: "Diya Malhotra", rollNo: "002", present: true, percentage: 81 },
      { id: 3, name: "Sarthak Jain", rollNo: "003", present: false, percentage: 66 },
    ],
    3: [
      { id: 1, name: "Kavya Sharma", rollNo: "001", present: true, percentage: 93 },
      { id: 2, name: "Aditya Rao", rollNo: "002", present: false, percentage: 72 },
      { id: 3, name: "Zara Khan", rollNo: "003", present: true, percentage: 87 },
    ],
  });

  /* ---------------- STATE ---------------- */

  const [selectedClass, setSelectedClass] = useState(1);
  const [attendanceState, setAttendanceState] = useState({});
  const currentDate = new Date().toISOString().split("T")[0];

  /* ---------------- INIT ---------------- */

  const initAttendance = (classId) => {
    if (!attendanceState[classId]) {
      const initial = {};
      (attendanceData[classId] || []).forEach((s) => {
        initial[s.id] = s.present;
      });
      setAttendanceState((prev) => ({ ...prev, [classId]: initial }));
    }
  };

  /* ---------------- TOGGLE ---------------- */

  const toggleAttendance = (classId, studentId) => {
    initAttendance(classId);
    setAttendanceState((prev) => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [studentId]: !prev[classId]?.[studentId],
      },
    }));
  };

  /* ---------------- STATS ---------------- */

  const stats = useMemo(() => {
    initAttendance(selectedClass);
    const students = attendanceData[selectedClass] || [];
    const present = students.filter(
      (s) => attendanceState[selectedClass]?.[s.id]
    ).length;
    const total = students.length;
    const percentage = total ? ((present / total) * 100).toFixed(1) : 0;
    return { present, total, percentage };
  }, [selectedClass, attendanceState]);

  const selectedClassInfo = classes.find((c) => c.id === selectedClass);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              Teacher Dashboard
            </h1>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <Calendar size={16} />
              {new Date(currentDate).toDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back</p>
            <p className="text-xl font-semibold text-black">Mr. Teacher</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SIDEBAR */}
        <aside className="bg-white rounded-xl border shadow-sm">
          <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl font-semibold flex items-center gap-2">
            <BookOpen size={18} /> My Classes
          </div>
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`w-full px-6 py-4 text-left border-b hover:bg-blue-50 transition ${
                selectedClass === cls.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
              }`}
            >
              <p className="font-semibold">{cls.name}</p>
              <p className="text-sm text-gray-500">{cls.subject}</p>
              <p className="text-xs text-red-500 mt-1">
                {cls.defaulters} defaulters
              </p>
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <section className="lg:col-span-2 space-y-6">
          {/* CLASS INFO */}
          <div className="bg-white border rounded-xl p-6 shadow-sm grid grid-cols-2 gap-4">
            <Info label="Class" value={selectedClassInfo.name} />
            <Info label="Subject" value={selectedClassInfo.subject} />
            <Info label="Schedule" value={selectedClassInfo.schedule} />
            <Info label="Room" value={selectedClassInfo.room} />
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Present" value={stats.present} color="green" icon={<CheckCircle />} />
            <Stat label="Absent" value={stats.total - stats.present} color="red" icon={<XCircle />} />
            <Stat label="Attendance %" value={`${stats.percentage}%`} color="blue" icon={<TrendingUp />} />
          </div>

          {/* ATTENDANCE TABLE */}
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4 font-semibold flex justify-between">
              <span>Mark Attendance</span>
              <span className="text-sm">{currentDate}</span>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">Roll</th>
                  <th className="px-6 py-3 text-left text-sm">Student</th>
                  <th className="px-6 py-3 text-center text-sm">Status</th>
                  <th className="px-6 py-3 text-center text-sm">Attendance %</th>
                  <th className="px-6 py-3 text-center text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {(attendanceData[selectedClass] || []).map((s) => {
                  initAttendance(selectedClass);
                  const present = attendanceState[selectedClass]?.[s.id];
                  return (
                    <tr key={s.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{s.rollNo}</td>
                      <td className="px-6 py-3 font-medium">{s.name}</td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            present
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {present ? "Present" : "Absent"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`text-sm font-semibold ${
                            s.percentage < 75 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {s.percentage}%
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => toggleAttendance(selectedClass, s.id)}
                          className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const Stat = ({ label, value, icon, color }) => (
  <div className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center">
    <div>
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className={`text-${color}-600`}>{icon}</div>
  </div>
);

export default TeacherDashboard;
