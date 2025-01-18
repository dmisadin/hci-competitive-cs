interface SectionProps {
    image?: string;
    outerBackgroundImage?: string;
    direction?: "flex-row" | "flex-row-reverse";
    title: string;
    description: string;
    outerBackgroundColor?: string;
    innerBackgroundColor?: string;
  }
  
  export default function Section({
    image,
    outerBackgroundImage,
    direction = "flex-row",
    title,
    description,
    outerBackgroundColor = "transparent",
    innerBackgroundColor = "",
  }: SectionProps) {
    return (
      <div
      className={`w-full flex ${direction} justify-between items-center mb-14 lg:mb-0 bg-cover bg-center flex-wrap lg:flex-nowrap
      ${outerBackgroundImage ? "lg:h-[363px] h-[272px]" : ""}`}
      style={{
        backgroundImage: outerBackgroundImage ? `url(${outerBackgroundImage})` : "none",
        backgroundColor: outerBackgroundImage ? "transparent" : outerBackgroundColor,
      }}
      >
        <div
          className="h-[272px] lg:max-w-[503px] w-full bg-cover bg-center mb-4 lg:mb-0 "
          style={{
            backgroundImage: image ? `url(${image})` : "none",
            height: image ? "272px" : "auto", 
          }}
        >
        </div>
  
        <div
          className={`flex flex-col w-full lg:w-[40%] justify-center px-4 
            ${innerBackgroundColor ? "max-w-[300px] lg:h-[200px] h-[150px] p-[10px] ml-[50px]" : ""}`}
          style={{
            backgroundColor: innerBackgroundColor,
            color: innerBackgroundColor ? "white" : "#212121",
          }}
        >
          <span className="text-xl lg:text-2xl font-bold mb-3">{title}</span>
          <p className="text-sm lg:text-base">{description}</p>
        </div>
      </div>
    );
  }
  
  