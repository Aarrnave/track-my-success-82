import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const semesterData = [
  { semester: 'Sem 1', gpa: 7.2 },
  { semester: 'Sem 2', gpa: 7.8 },
  { semester: 'Sem 3', gpa: 8.1 },
  { semester: 'Sem 4', gpa: 7.9 },
  { semester: 'Sem 5', gpa: 8.3 },
  { semester: 'Sem 6', gpa: 8.5 },
];

const subjectPerformance = [
  { subject: 'Mathematics', midterm: 78, internal: 85, external: 82, average: 81.7 },
  { subject: 'Physics', midterm: 72, internal: 78, external: 75, average: 75.0 },
  { subject: 'Chemistry', midterm: 85, internal: 88, external: 87, average: 86.7 },
  { subject: 'English', midterm: 80, internal: 82, external: 79, average: 80.3 },
  { subject: 'Computer Science', midterm: 90, internal: 92, external: 89, average: 90.3 },
];

export function AcademicChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* GPA Trend */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">GPA Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={semesterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="semester" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              domain={[0, 10]}
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
            <Line 
              type="monotone" 
              dataKey="gpa" 
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Subject Performance Radar */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Subject Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={subjectPerformance}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 10 }}
              className="text-muted-foreground"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10 }}
              className="text-muted-foreground"
            />
            <Radar
              name="Average"
              dataKey="average"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}