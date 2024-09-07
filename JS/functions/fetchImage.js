const fetchImage = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        const imgURL = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = imgURL;
        document.body.appendChild(img);
    } catch (e) {
        console.log("Error fetching the image:", e);
    }
};
