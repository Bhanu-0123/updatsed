// Firebase Realtime Database URL
const databaseURL = "https://leave-1ca65-default-rtdb.firebaseio.com/";

// Function to submit leave using Fetch API
function submitLeave() {
    const employeeName = $('#employeeName').val();
    const leaveType = $('#leaveType').val();
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();

    const leaveData = {
        employeeName,
        leaveType,
        startDate,
        endDate,
        status: 'Pending'
    };

    // Using Fetch API to send a POST request to add leave request
    fetch(`${databaseURL}/leaveRequests.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData),
    })
    .then(response => response.json())
    .then(data => {
        const leaveId = data.name; // Firebase returns a unique ID for the newly added data
        alert(`Leave request submitted successfully! Leave ID: ${leaveId}`);
        displayLeaveStatus(leaveId); // Display the status to the user
    })
    .catch(error => {
        console.error('Error submitting leave request: ', error);
    });
}

// Function to display leave status to the user
function displayLeaveStatus(leaveId) {
    const leaveStatusDiv = $('#leaveStatus');

    // Function to check and update leave status
    function checkLeaveStatus() {
        fetch(`${databaseURL}/leaveRequests/${leaveId}.json`)
            .then(response => response.json())
            .then(data => {
                if (data && data.status) {
                    leaveStatusDiv.text(`Leave Status: ${data.status}`);
                    if (data.status === 'Approved' || data.status === 'Denied') {
                        clearInterval(checkStatusInterval); // Stop checking once approved or denied
                    }
                } else {
                    leaveStatusDiv.text('Unable to retrieve leave status.');
                }
            })
            .catch(error => {
                console.error('Error fetching leave status: ', error);
                leaveStatusDiv.text('Error fetching leave status.');
            });
    }

    // Initial check
    checkLeaveStatus();

    // Check and update leave status every 5 seconds
    const checkStatusInterval = setInterval(checkLeaveStatus, 5000);
}

// Call the display function with a sample leaveId
// Replace 'sampleLeaveId' with the actual leaveId when integrating into your application
displayLeaveStatus('sampleLeaveId');
