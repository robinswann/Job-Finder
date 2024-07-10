document.getElementById('job-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    getJobs(description, location);
});

async function getJobs(description, location) {
    const url = `fetch_jobs.php?keywords=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayJobs(data.jobs);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('job-results').innerHTML = '<p>There was an error retrieving job listings. Please try again later.</p>';
    }
}

function displayJobs(jobs) {
    const jobResults = document.getElementById('job-results');
    jobResults.innerHTML = '';
    if (jobs.length === 0) {
        jobResults.innerHTML = '<p>No jobs found. Please try a different search.</p>';
        return;
    }
    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Location: ${job.locations}</p>
            <p>Salary: ${job.salary}</p>
            <p>Date: ${job.date}</p>
            <p>Description: ${job.description}</p>
            <a href="${job.url}" target="_blank"><button>Apply Now</button></a>
        `;
        jobResults.appendChild(jobCard);
    });
}