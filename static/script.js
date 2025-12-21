async function uploadFiles() {
    const input = document.getElementById('fileInput');
    const status = document.getElementById('status');

    if (input.files.length === 0) {
        status.innerText = "⚠️ Please select files first.";
        return;
    }

    const formData = new FormData();
    // Append all selected files
    for (const file of input.files) {
        formData.append('files', file);
    }

    status.innerText = "⏳ Uploading...";

    try {
        // Fetch to the C++ Backend
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json(); 
        
        if (data.status === "ok") {
            status.innerText = "✅ " + data.message;
            status.style.color = "#00ff00"; // Green
        } else {
            status.innerText = "❌ Server Error";
            status.style.color = "#ff0000"; // Red
        }
    } catch (error) {
        console.error(error);
        status.innerText = "❌ Connection Error";
        status.style.color = "#ff0000";
    }
}