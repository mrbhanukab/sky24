import Styles from "@/styles/Ads.module.css";

export default function Ads(props) {
  const { Main, Others } = props.adsData;

  return (
    <section className={Styles.mainContainer}>
      <div className={Styles.mainSponsorContainer}>
        <div className={Styles.mainMsg}>
          <h1>
            All Of These Possible
            <br />
            Because of our Sponsors
          </h1>
          <p>
            Thanks to our sponsors! Your support powers our cosmic journey,
            enabling us to explore the universe's mysteries. With your help, we
            create unforgettable experiences for our participants. Together, we
            journey among the stars.
          </p>
        </div>
        <div className={Styles.MainSponsorIframe}>
          <iframe
            src={`https://www.youtube.com/embed/${Main}?autoplay=1&loop=1&rel=0&fs=0&controls=0&playlist=${Main}`}
            frameborder="0"
          />
          <h5>Main Sponsor</h5>
        </div>
      </div>
      <section className={Styles.others}>
        {Object.entries(Others).map(([sponsorType, videoId]) => (
          <div key={sponsorType}>
            <h5>{sponsorType} Sponsor</h5>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&loop=1&modestbranding=1&rel=0&fs=0&controls=0&playlist=${videoId}`}
              frameborder="0"
            ></iframe>
          </div>
        ))}
      </section>
    </section>
  );
}
