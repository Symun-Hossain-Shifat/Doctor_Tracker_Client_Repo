"use client"

import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts"

function ChartCard({ title, subtitle, children }) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <p className="mb-4 text-xs text-gray-500">{subtitle}</p>
            <div className="h-72">{children}</div>
        </section>
    )
}

export default function DashboardCharts({ daily, perDoctor }) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartCard title="New registrations" subtitle="Last 30 days">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={daily}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={24} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="patients" stroke="#16a34a" fill="#16a34a" fillOpacity={0.15} />
                        <Area type="monotone" dataKey="doctors" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Patient load by doctor" subtitle="Top 8 doctors">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={perDoctor} layout="vertical" margin={{ left: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="patients" fill="#9333ea" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    )
}