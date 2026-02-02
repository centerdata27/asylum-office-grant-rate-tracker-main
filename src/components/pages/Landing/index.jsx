import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import {decodeBase64} from '../../../utils/decodeBase64.js';

import { NavLink } from 'react-router-dom'; // Navlink for quick access to the graphs page

/*
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
*/
/*
 * Notes for class (Ticket 1 - Landing Page)
 * - This component implements the Landing Page UI.
 * - Key sections: Hero header, three feature cards (bar/pie/line images),
 *   call-to-action buttons (View the Data, Download the Data), information
 *   section with an image and description, and the insights section.
 * - Talking points:
 *   1. Show how Tailwind classes are used for layout and styling.
 *   2. Point out the `NavLink` to `/graphs` (navigates to data visualizations).
 *   3. The `downloadCSV` method (from `useDownloadData`) provides an export
 *      option for users to download the dataset used by the app.
 *   4. The Back To Top button demonstrates a small DOM interaction (smooth scroll).
 */
export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20; // Adjust the divisor for speed
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10); // Adjust the interval time for smoothness
  };

  // --- Ticket 1: Back-to-top helper ---
  // This function implements a smooth scroll to the top when the Back To Top button is clicked.

  const handleReadMore = () => {
    // TODO: navigate to the humanrightsfirst.org homepage
  };

  return (
    <div className='flex-c w-[100vw] secondary-c'>
      {/* Landing Page
      <div>{'Type this into Canvas: ' + decodeBase64('VGltZTJDb2RlIQ==')}</div> */}
      {/* Ticket 1: Hero header */}
      <div className="bg-[#666555] pt-4 pb-8">
        <h1 className="text-6xl mb-8 text-[#ffffff]">Asylum Office Grant Rate Tracker</h1>
        <h3 className="text-[#ffffff]">The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions</h3>
      </div>
      {/* Ticket 1: Feature cards (bar / pie / line) */}
      <div className="flex justify-center m-14 gap-20 text-2xl">
        <div>
          <img className="flex-c gap-3 h-[300px] w-[500px] m-[20px]" src={barGraph} alt="barGraph image"/>
          <h3>Search Grant Rates By Office</h3>
        </div>
       <div>
        <img className="flex-c gap-3 h-[300px] w-[400px] m-[20px]" src={pieChart} alt="pieChart image"/>
        <h3>Search Grant Rates By Nationality</h3>
       </div>
       <div>
        <img className="flex-c gap-3 h-[300px] w-[500px] m-[20px]" src={lineGraph} alt="lineGraph image"/> 
        <h3>Search Grant Rates Over Time</h3>
       </div>
      </div>
      {/* Ticket 1: Call-to-action buttons */}
      <div className="flex align-center mx-auto gap-8">
        {/* Navigate to the graphs page which uses API/test data */}
        <NavLink className="bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold" to="/graphs">View the Data</NavLink>
        {/* Download uses the useDownloadData hook to export current graphData */}
        <button onClick={downloadCSV} className="bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold">Download the Data</button>
      </div>
      <section className="middle-section flex">
        <div className="flex-1 hrf-img-container content-center p-20">
          <img className="hrf-img rounded-2xl h-[70%] w-[100%]" src={paperStack}/>
        </div>
        <div className="middle-section-text-container flex-1 content-center p-20">
          <p className="text-xl">Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021 by the USCIS Asylum Office, which we received through a Freedom of Information Act request. You can search for information on asylum grant rates by year, nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.</p>
        </div>
      </section>
      <h1 className="text-5xl mb-[50px]">Systemic Disparity Insights</h1>
      <div className="insights-section-details flex justify-center m-14 gap-20 text-1xl">
        <div className="flex-c-1 gap-12">
          <div className="insights-details-header">
            <h3 className="text-4xl">36%</h3>
          </div>
          <div className="insights-details-content">
            <h3 className="text-lg">By the end of the Trump administration, the average asylum office grant rate had fallen 36% from an average of 44 percent in fiscal year 2016 to 28 percent in fiscal year 20202.</h3>
          </div>
        </div>
        <div className="flex-c-1 gap-12">
          <div className="insights-details-header">
            <h3 className="text-4xl">5%</h3>
          </div>
          <div className="insights-details-content">
            <h3 className="text-lg">The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.</h3>
          </div>
        </div>
        <div className="flex-c-1 gap-12">
          <div className="insights-details-header">
            <h3 className="text-4xl">6x Lower</h3>
          </div>
          <div className="insights-details-content">
            <h3 className="text-lg">Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was 6 times lower than the San Francisco asylum office.</h3>
          </div>
        </div>
      </div>
      <div className="read-more-butt-container">
        <NavLink className="primary-c text-white px-4 py-2" to="https://humanrightsfirst.org/">Read More</NavLink>
      </div>
      <button className="p-[64px]" onClick={scrollToTop}>Back To Top ^</button>
    </div>
  );
};
