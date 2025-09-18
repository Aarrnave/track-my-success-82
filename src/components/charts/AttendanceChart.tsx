import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const attendanceData = [
  { subject: 'Mathematics', attendance: 85, target: 75 },
  { subject: 'Physics', attendance: 72, target: 75 },
  { subject: 'Chemistry', attendance: 90, target: 75 },
  { subject: 'English', attendance: 68, target: 75 },
  { subject: 'Computer Science', attendance: 88, target: 75 },
];

const overallAttendance = [
  { name: 'Present', value: 82, color: 'hsl(var(--success))' },
  { name: 'Absent', value: 18, color: 'hsl(var(--destructive))' },
];

export function AttendanceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Subject-wise Attendance */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Subject-wise Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="subject" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Bar 
              dataKey="attendance" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="target" 
              fill="hsl(var(--muted))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall Attendance */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Overall Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={overallAttendance}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {overallAttendance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4">
          {overallAttendance.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}