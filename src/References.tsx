import React from "react";

export const References: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        References
      </h2>

      {/* Dataset References */}
      <h3 style={{ color: "#444", marginBottom: "15px" }}>Used Datasets</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://climate.nasa.gov/vital-signs/carbon-dioxide/?intent=121"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            CO2 Dataset (NASA Climate Change)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.nifc.gov/fire-information/statistics/wildfires"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Number of Wildfires Dataset (NIFC)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.iii.org/fact-statistic/facts-statistics-wildfires"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Annual Number of Acres Burned in Wildland Fires (III)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://ourworldindata.org/grapher/annual-carbon-dioxide-emissions"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Annual CO₂ Emissions from Wildfires (Our World in Data)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://firms.modaps.eosdis.nasa.gov/api/area/html/e2f39e4db008b224206b270ed8bae06f/VIIRS_SNPP_NRT/world/1"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            WildFires Dataset (NASA FIRMS)
          </a>
        </li>
      </ul>

      {/* Animal References */}
      <h3 style={{ color: "#444", marginTop: "30px", marginBottom: "15px" }}>
        Animal References
      </h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://columbiainsight.org/columbia-basin-pygmy-rabbits-are-facing-extinction/#:~:text=Climate%20change%2C%20wildfires%20to%20blame,wildfires%20have%20on%20shrubsteppe%20habitat."
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Columbia Basin Pygmy Rabbit (Columbia Insight)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.latimes.com/environment/story/2024-09-15/endangered-frogs-threatened-by-california-wildfires"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Southern California Yellow-legged Frog (LA Times)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.nationalgeographic.com/animals/article/endangered-akikiki-bird-hawaii-maui-wildfires-extinction"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Akikiki Bird (National Geographic)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.skyedaily.com/news/news_view.html?ID=97110"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Koala (Skye Daily)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.yna.co.kr/view/AKR20190918063000104?input=1195m"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Orangutan (Yonhap News)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.wwf.gr/en/our_work/nature/terrestrial/endangered_species/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Griffon Vulture (WWF Greece)
          </a>
        </li>
      </ul>

      {/* Referenced Sources */}
      <h3 style={{ color: "#444", marginTop: "30px", marginBottom: "15px" }}>
        Referenced Sources
      </h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://dataspace.copernicus.eu/analyse/apis/sentinel-hub"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Sentinel Hub API (Copernicus)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://eodashboard.org/story?id=australian-bushfires&page=3"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Australian Bushfires (EO Dashboard)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://www.nifc.gov/fire-information/statistics/wildfires"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Wildfire Statistics (NIFC)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://disc.gsfc.nasa.gov/datasets/OMTO3d_003/summary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Aerosol Data (NASA)
          </a>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <a
            href="https://ghrc.nsstc.nasa.gov/lightning/data/data_lis_iss.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#0066cc" }}
          >
            Lightning Data (NASA LIS ISS) - Blakeslee, Richard J. 2021. *NRT
            Lightning Imaging Sensor (LIS) on International Space Station (ISS)
            Science Data*
          </a>
        </li>
      </ul>
    </div>
  );
};
