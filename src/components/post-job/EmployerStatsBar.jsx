import StatsBar from '../home/StatsBar.jsx';
import { heroStats } from '../../data/postJobPage.js';

export default function EmployerStatsBar() {
  return <StatsBar stats={heroStats} />;
}
