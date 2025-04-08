interface MapProps {
  location?: {
    lat: number;
    lng: number;
  };
  mapsLink?: string;
}

const Map = ({ location, mapsLink }: MapProps = {}) => {
  // Default to Siargao Island coordinates if no specific location is provided
  const defaultLocation = "Siargao+Island";
  const locationParam = location 
    ? `q=${location.lat},${location.lng}` 
    : `q=${defaultLocation}`;
  
  // If a specific Google Maps link is provided, use that instead
  if (mapsLink) {
    // Extract the embed URL from a Google Maps share link if provided
    // Example input: https://maps.app.goo.gl/xyz or https://goo.gl/maps/xyz
    // We need to convert it to an embed URL
    
    // For simplicity, we'll just render an iframe with the direct link
    // and a button to open in Google Maps
    return (
      <div className="bg-white/50 backdrop-blur-md rounded-lg p-4 border h-80 flex flex-col">
        <iframe
          src={mapsLink.includes('maps.google.com/embed') ? mapsLink : `https://www.google.com/maps/embed?${locationParam}&pb=!1m18!1m12!1m3!1d253851.1940415329!2d126.03408139901505!3d9.848856021520492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301c3952149dce9%3A0xad6da6a59c10dfe1!2sSiargao%20Island!5e0!3m2!1sen!2sph!4v1697006385364!5m2!1sen!2sph`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Siargao Map"
          className="rounded mb-2 flex-1"
        ></iframe>
        <a 
          href={mapsLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-2 text-center py-2 px-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Open in Google Maps
        </a>
      </div>
    );
  }
    
  return (
    <div className="bg-white/50 backdrop-blur-md rounded-lg p-4 border h-80">
      <iframe
        src={`https://www.google.com/maps/embed?${locationParam}&pb=!1m18!1m12!1m3!1d253851.1940415329!2d126.03408139901505!3d9.848856021520492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301c3952149dce9%3A0xad6da6a59c10dfe1!2sSiargao%20Island!5e0!3m2!1sen!2sph!4v1697006385364!5m2!1sen!2sph`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Siargao Map"
        className="rounded"
      ></iframe>
    </div>
  );
};

export default Map;