import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import supabase from "../../../supabase/client";
import styles from "./BasicTabs.module.css";
import Favorites from "./Favorites";
import Profile from "./Profile";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className={styles.tabPanel}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [reviews, setReviews] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select(
          "id, review_content, created_at, review_title, profiles!inner(username)"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Errore nel recupero delle recensioni:", error.message);
      } else {
        setReviews(data);
      }

      setLoading(false); 
    };

    fetchReviews();
  }, []);

  return (
    <Box className={styles.tabsContainer}>
      <Box className={styles.tabsHeader}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={styles.tabs}
        >
          <Tab
            label="Profile"
            {...a11yProps(0)}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "white",
                borderBottom: "none",
              },
              "&:hover": {
                color: "white",
              },
            }}
          />
          <Tab
            label="Favorite Games"
            {...a11yProps(1)}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "white",
                borderBottom: "none",
              },
              "&:hover": {
                color: "white",
              },
            }}
          />
          <Tab
            label="Reviews"
            {...a11yProps(2)}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "white",
                borderBottom: "none",
              },
              "&:hover": {
                color: "white",
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} className={styles.mainProfile}>
        <Profile />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Favorites />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <div className={styles.reviewsContainer}>
          {loading ? (
            <div className={styles.loadingText}>
              Caricamento delle recensioni...
            </div>
          ) : reviews.length > 0 ? (
            <div className={styles.reviewsList}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                  <p className={styles.reviewUsername}>
                    <strong>
                      {review.profiles.username || "Utente sconosciuto"}
                    </strong>
                  </p>
                  <h4 className={styles.reviewTitle}>{review.review_title}</h4>
                  <p className={styles.reviewContent}>
                    {review.review_content}
                  </p>
                  <span className={styles.reviewDate}>
                    {new Date(review.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noReviews}>
              Non ci sono recensioni disponibili.
            </p>
          )}
        </div>
      </CustomTabPanel>
    </Box>
  );
}
