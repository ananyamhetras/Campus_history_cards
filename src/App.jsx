import { useState } from "react";

// Import images for the cards
import rushImg from "./rush.jpg"
import rossImg from "./ross.jpg"
import mainImg from "./main.jpg"
import mainfrontImg from "./mainfront.jpg"

// Define the data for the cards as an array of objects
const cards = [
  {
    title: "Rush Building",
    image: rushImg,
    sections: ["Built in 1904", "Was originally a tuberculosis ward! The Hospital for the Treatment of Consumption and Related Diseases", "Used to be home to CCI"],
  },
  {
    title: "Ross Commons",
    image: rossImg,
    sections: ["Built in 1888", "Purchased by Drexel in 1928", "Was home to a railroad tycoon, and later a Domestic Science and Arts Training School"],
  },
  {
    title: "Main Building",
    image: mainfrontImg,
    sections: ["Built in 1891", "Another house was previously on site, built in 1820", "Purchased by Joseph S. Keen, a lumber merchant in 1830, and subsequently sold to Drexel in 1883"],
  },
];

// Define the main component for the carousel
export default function CardCarousel() {

  // hovered = index of card mouse is over
  // selected = index of card clicked (focused)
  // flipped = index of card showing the back
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(null);

  // How much to enlarge a card when hovered or selected
  const scaleHover = 1.3;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fdfcfb",
        fontFamily: `"Georgia", "Times New Roman", serif`,
        position: "relative",
      }}>        
      
        {/* HEADING */}
        <h1 style={{
          color: "#1c1c1e",
          fontSize: "2rem",
          marginTop: "-200px",  // Move heading up
          marginBottom: "80px",
          textAlign: "center",
          textShadow: "1px 1px 1px rgba(0,0,0,0.7)",
          fontFamily: `"Georgia", "Times New Roman", serif`,
          }}>  Campus History Cards </h1>

      <div style={{
        position: "absolute",
        bottom: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#2b2b2f",
        padding: "12px 20px",
        borderRadius: "12px",
        color: "white",
        fontFamily: `"Georgia", "Times New Roman", serif`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        textAlign: "center",
        maxWidth: "90%",
        }}>
          <div>1. Hover over a card to enlarge it</div>
          <div>2. Click that card to focus on it</div>
          <div>3. Click again to flip it</div>
          <div>4. Press × to close</div>
          </div>
          
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
          }}>
            
            {cards.map((card, index) => {

              // Check if this card is hovered, selected, or flipped
              const isHovered = index === hovered;
              const isSelected = index === selected;
              const isFlipped = index === flipped;
              
              // Scale up if hovered or selected, else normal
              const scale = isHovered || isSelected ? scaleHover : 1;

              // Put hovered/selected card on top
              const zIndex = isHovered || isSelected ? 50 : 10;

          return (
            <div
              key={index}
              onMouseEnter={() => {
                if (selected === null) setHovered(index);  // Hover effect only if no card selected
              }}
              onMouseLeave={() => {
                if (selected === null) setHovered(null);  // Remove hover effect
              }}
              onClick={() => {
                if (selected === index) {
                  setFlipped(isFlipped ? null : index);   // Flip card back/forth
                } else {
                  setSelected(index);  // Select this card
                  setHovered(index);   // Keep hover effect
                }
              }}
              style={{
                zIndex,
                transition: "transform 0.3s",
                cursor: "pointer",
                perspective: "1000px",
              }}
            >
              {/* CARD */}
              <div style={{ width: "250px", height: "350px", position: "relative" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.5s",
                    transform: `${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"} scale(${scale})`,
                  }}
                >
                  {/* FRONT */}
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                      border: "3px solid black",
                      background: "#1c1c1e",
                      color: "#e6e6e6",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backfaceVisibility: "hidden",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      style={{ width: "100%",
                               height: "150px",
                               maxHeight: "150px", 
                               objectFit: "cover",
                              }}/>
                              
                              <h2 style={{
                                marginTop: "12px", 
                                fontWeight: "bold", 
                                fontSize: "1.2rem", 
                                fontFamily: `"Georgia", 
                                "Times New Roman", serif`
                                }}>

                      {card.title}</h2>
                      </div>
                      {/* BACK */}
                      <div style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                      border: "2px solid #444",
                      background: "#2b2b2f",
                      color: "#e6e6e6",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backfaceVisibility: "hidden",   // hide front when flipped
                      transform: "rotateY(180deg)",   // Rotate back to show
                      boxSizing: "border-box",
                      overflow: "hidden",
                    }}
                  >
                    <h2 style={{ 
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      fontFamily: `"Georgia", "Times New Roman", serif`
                      }}>
                        {card.title}
                        </h2>
                        
                        {/* SECTION BOXES */}
                        {card.sections.map((sec, i) => (
                          <div key={i} style={{
                          backgroundColor: "#c5a880",
                          padding: "6px 8px",
                          borderRadius: "8px",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {sec}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CLOSE BUTTON */}
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();   //Prevent flipping/selecting card again
                      setSelected(null);     // Deselect card
                      setFlipped(null);      // Reset flipped state
                      setHovered(null);      // Reset hovered state
                    }}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      lineHeight: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}