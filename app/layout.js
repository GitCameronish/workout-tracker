import WorkoutTracker from '@/components/WorkoutTracker';

export const metadata = {
  title: 'Workout Tracker',
  description: 'Track your workouts and progress',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
