function TypeWriter({text, fontSize = "1rem", width = 100})
{
    const length = text.length;

    return(
        <div className="relative">
            <p className="font-jetbrains-mono"
                style={{
                    width: `${Math.floor(length * width / 100)}ch`,
                    fontSize: fontSize,
                    overflow: "hidden",
                    textWrap: "nowrap"
                }}
            >{text}</p>

            <div 
                className="absolute top-0 h-full bg-black animate-cursor-blink"
                style={{
                    width: `${parseFloat(fontSize) / 15}rem`,
                    right: `-${parseFloat(fontSize) / 15}rem`
                }}
            ></div>
        </div>
    );
}

export default TypeWriter;