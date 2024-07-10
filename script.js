        document.getElementById('job-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            var description = ''; // No longer collecting description input
            var location = ''; // No longer collecting location input

            // Make API request
            fetchJobs(description, location);
        });

        function fetchJobs(description, location) {
            var apiEndpoint = 'http://public.api.careerjet.net/search'; // Adjust this to Careerjet's API endpoint
            var affiliateId = ''; // This may not be needed for Careerjet's public API

            var formData = new FormData();
            formData.append('keywords', description);
            formData.append('location', location);
            formData.append('affid', affiliateId);

            fetch(apiEndpoint, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                displayJobs(data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
        }

        function displayJobs(data) {
            var resultsDiv = document.getElementById('job-results');
            resultsDiv.innerHTML = ''; // Clear previous results

            if (data && data.jobs && data.jobs.length > 0) {
                resultsDiv.innerHTML += `<p>Found ${data.jobs.length} jobs</p>`;
                data.jobs.forEach(job => {
                    resultsDiv.innerHTML += `
                        <div class="cjjob">
                            <p class="jobtitle"><strong>Title:</strong> ${job.title}</p>
                            <p class="company"><strong>Company:</strong> ${job.company}</p>
                            <p class="locations"><strong>Location:</strong> ${job.locations}</p>
                            <p><a href="${job.url}" target="_blank">Apply</a></p>
                        </div>
                    `;
                });
            } else {
                resultsDiv.innerHTML += '<p>No jobs found.</p>';
            }
        }
