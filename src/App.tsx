import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './app/pages/Home'
import About from './app/pages/About'
import Partnerships from './app/pages/Partnerships'
import AdvancedDataServices from './app/pages/AdvancedDataServices'
import UpskillingServices from './app/pages/UpskillingServices'
import StaffingServices from './app/pages/StaffingServices'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/advanced-data-services" element={<AdvancedDataServices />} />
        <Route path="/upskilling-services" element={<UpskillingServices />} />
        <Route path="/staffing-services" element={<StaffingServices />} />
      </Routes>
    </BrowserRouter>
  )
}
