const TZ = "Asia/Dhaka"
// "en-CA" formats as YYYY-MM-DD; the explicit timezone prevents off-by-one days
const dayKey = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ })

export function buildDailySeries(doctors, patients, days = 30) {
    const rows = new Map()
    const now = new Date()

    // Pre-fill every day so days with zero sign-ups still appear on the chart
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now)
        d.setDate(d.getDate() - i)
        rows.set(dayKey(d), { date: dayKey(d).slice(5), doctors: 0, patients: 0 })
    }
    for (const d of doctors) {
        const row = rows.get(dayKey(d.createdAt))
        if (row) row.doctors++
    }
    for (const p of patients) {
        const row = rows.get(dayKey(p.createdAt))
        if (row) row.patients++
    }
    return [...rows.values()]
}

export function buildPatientsPerDoctor(doctors, patients, top = 8) {
    const counts = new Map()
    for (const p of patients) {
        const id = String(p.doctorId)
        counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    return doctors
        .map((d) => ({ name: d.name, patients: counts.get(String(d._id)) ?? 0 }))
        .sort((a, b) => b.patients - a.patients)
        .slice(0, top)
}

export const sumLast = (series, key, n = 7) =>
    series.slice(-n).reduce((sum, r) => sum + r[key], 0)