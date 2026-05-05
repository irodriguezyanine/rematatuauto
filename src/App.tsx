import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import ComoFuncionaPage from '@/pages/ComoFuncionaPage'
import DudasPage from '@/pages/DudasPage'
import HomePage from '@/pages/HomePage'
import LegalesPage from '@/pages/LegalesPage'
import QuienesSomosPage from '@/pages/QuienesSomosPage'
import TasacionPage from '@/pages/TasacionPage'
import {
  COMO_FUNCIONA_PATH,
  DUDAS_PATH,
  LEGALES_PATH,
  QUIENES_SOMOS_PATH,
  TASAR_PATH,
} from '@/routes'

const tasacionSegment = TASAR_PATH.replace(/^\//, '')
const comoSegment = COMO_FUNCIONA_PATH.replace(/^\//, '')
const quienesSegment = QUIENES_SOMOS_PATH.replace(/^\//, '')
const dudasSegment = DUDAS_PATH.replace(/^\//, '')
const legalesSegment = LEGALES_PATH.replace(/^\//, '')

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path={tasacionSegment} element={<TasacionPage />} />
          <Route path={comoSegment} element={<ComoFuncionaPage />} />
          <Route path={quienesSegment} element={<QuienesSomosPage />} />
          <Route path={dudasSegment} element={<DudasPage />} />
          <Route path={legalesSegment} element={<LegalesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
