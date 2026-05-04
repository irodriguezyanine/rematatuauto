import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import HomePage from '@/pages/HomePage'
import TasacionPage from '@/pages/TasacionPage'
import { TASAR_PATH } from '@/routes'

const tasacionSegment = TASAR_PATH.replace(/^\//, '')

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path={tasacionSegment} element={<TasacionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
