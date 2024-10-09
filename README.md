# Data Visualization Dashboard
**Assignment by BlackCoffer**

The Data Visualization Dashboard is an interactive web application designed to provide users with comprehensive insights through various data visualizations. Built with a modern tech stack, the dashboard fetches data dynamically from a Flask backend API, ensuring real-time updates and efficient data handling.

## Project Features
- **Login and Logout Setup**: The login page features a simple form with a welcoming message and a login button. Upon clicking the login button, an alert dialog appears to inform users that they are being redirected to the dashboard.
- **Dashboard**: It is a data visualization dashboard featuring charts like ILR Chart, Region Chart, Topics Radar Chart, Bubble Chart, Pie Chart, Likelihood Radar Chart, and Country Chart. The dashboard dynamically fetches data from a backend API using Axios and offers robust filtering options for end year, country, PEST, and source. It also includes a chart selector for switching visualizations and a reset filter option.

### Filters
- **End Year Filter**: Allows users to filter data based on a specified end year using a range slider, enabling selection between 2000 and 2024, with the current selected year displayed as a label.
- **Country Filter**: Enables dynamic filtering of data based on user input, fetching a unique list of countries from an API endpoint.
- **PEST Filter**: Allows for targeted analysis based on specific PESTLE factors by retrieving a list of unique PESTLE entries from the same API endpoint.
- **Source Filter**: Lets users filter data based on its source through a dropdown selection.

### Charts and Visualizations
- **Intensity, Likelihood, and Relevance Chart (ILR Chart)**: Displays the metrics for intensity, likelihood, and relevance in a bar chart format, helping to identify trends and patterns in the data over time.
- **Region Chart**: Visualizes the distribution of data entries across different regions using a doughnut chart, updating based on selected topics.
- **Bubble Chart**: Visualizes the relationship between two variables on the x and y axes, with bubble size based on likelihood.
- **Sector Chart**: Displays the distribution of selected metrics across different sectors.
- **Likelihood Chart**: Aggregates and visualizes likelihood values of different countries in a radar chart format.
- **Topics Radar Chart**: Displays a polar area chart based on various topics.
- **Country Chart**: Shows a bar chart of metrics for different countries, dynamically updating based on selected metrics.

- **Additional Features**:
    - **Tasks**: Displays a list of tasks with their titles, descriptions, statuses, and due dates.
    - **Users**: Enables user account management.
    - **Calendar**: Provides a simple calendar with event display capabilities.
    - **Analytics**: Monitors key performance metrics, visualized over time.
    - **Settings**: Manages user profiles and notification preferences.

- **Backend**: The backend API is created using Flask, handling data retrieval and processing for the frontend.

## Tech Stack
- **Frontend**:
  - Framework: React
  - Styling: Chakra UI
  - Charting Libraries: Chart.js, Recharts, D3.js
  - State Management: Axios (for API calls)
  
- **Backend**:
  - Framework: Flask
  - Database: MongoDB (using PyMongo)

## Instructions
1. **Install Repository**:
   ```bash
   git clone https://github.com/harsh2077/Dashboard-visualization
2. **Set Up the Frontend**
    ```bash
   cd client
   npm install
3. **Start the Frontend Development Server**
    ```bash
   npm start
4. **Set Up the Backend**
    ```bash
   cd ../server
5. **Create a Virtual Environment**
    ```bash
    python -m venv venv
6. **Activate the Virtual Environment**
    ```bash
   venv\Scripts\activate
7. **Install Backend Dependencies**
    ```bash
   pip install -r requirements.txt
8. **Start the Backend Development Server**
    ```bash
   python app.py
