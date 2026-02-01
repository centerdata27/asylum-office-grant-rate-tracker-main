# Human Rights First: Asylum Report Generator

## Problem Statement
The Human Rights First (HRF) organization currently has a limited ability to provide user-friendly insights into their large dataset of asylum case decisions. Existing tools like the TRAC database have significant limitations, such as the inability to visualize trends over time or compare grant rates across different regions. This makes it difficult for journalists, researchers, and the general public (including asylum seekers and activists) to effectively analyze and draw insights from the data.

## North Star
The goal of this project is to create a search tool that gives users a more interactive and visual way to explore the asylum case data. Key features include:

- Generating real-time visualizations and graphs to represent trends over time
- Providing a heatmap to easily identify regions with high or low grant rates
- Allowing users to download the search results for further analysis

## Audiences
- Journalists
- Researchers
- General public (asylum seekers, activists, etc.)

## Users
- Administrators
  - Engineers who interact directly with infrastructure (no user authentication needed)
  - Add/manage data
- Public Users
  - Don't need to log in - just view and use the public web app
  - Display calendar dates vs. fiscal years in data (separate search options)
  - View pre-populated geographic regions based on sets of countries
  - View percentage of cases that were granted based on current search results
  - Save or print reports, charts, and/or graphs generated from a query

## Tickets
Here are summaries of the three tickets in the `tickets` directory, with links to the full ticket descriptions:

1. **Build Sprint 1: Landing Page**
   - [Ticket Description](tickets/1_firstTicket.md)
   - Deliver a landing page that matches the provided design screenshot, with a focus on the browser experience.

2. **Build Sprint 2: API Integration**
   - [Ticket Description](tickets/2_secondTicket.md)
   - Integrate the frontend application with an API to fetch data, and update the data visualizations to use the API data instead of the test data.

3. **Build Sprint 3: Authentication**
   - [Ticket Description](tickets/3_thirdTicket.md)
   - Integrate the Auth0 microservice to provide user authentication, and create a profile page that displays basic information about the logged-in user.

## Stretch Ticket
In addition to the three main tickets, there is also a stretch ticket available:

- **Stretch Ticket: Migrate to Next.js**
  - [Ticket Description](tickets/4_stretchTicketNEXTjs.md)
  - Migrate the current React application to Next.js to leverage server-side rendering, better performance, and routing capabilities.

## Resources
**The Setup for this project will require a new LTS Version of NodeJS to be installed. Node Version 20.x works well for this purpose.**

The following deployed site shows the exact deliverable and what you should be building:
- [Asylum Front End](https://asylum-fe.vercel.app)

## Getting Started

### Fork the Repository
First, fork this repository to your own GitHub account.

### Clone the Repository
Next, clone your forked repository to your local machine:

```
git clone https://github.com/{INSERT YOUR GITHUB USERNAME}/asylum-hrf-fe-starter.git
```

### Install Dependencies
Navigate to the project directory and install the dependencies:

```
cd asylum-hrf-fe-starter
npm install
```

### Start the Development Server
To start the development server, run:

```
npm run dev
```

This will start the development server then open the app in your web browser. Any changes you make to the code will automatically reload the page.

### Build the App
To create a production build of the app, run:

```
npm run build
```

This will create an optimized production build in the `dist` folder.
