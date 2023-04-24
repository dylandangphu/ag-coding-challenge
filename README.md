# Full Stack Coding Challenge

## Goal

*Use the web framework of your choice (next.js, django, flask, RoR, vue etc.) to create a web application with 2 pages that will be used by technical users to draw field boundaries.* 

### Page 1

A landing page that welcomes the user and provides a link to the map page.

### Page 2

This page should be a mapbox map where when the user can draw a polygon on the map (using mapbox draw ([https://github.com/mapbox/mapbox-gl-draw](https://github.com/mapbox/mapbox-gl-draw))). The geojson should be able to be stored with a save button. Upon saving, please send a notification that it has been successfully saved. 

### API

When the user saves the polygon, please build a simple API that POSTs that data, along with a timestamp, to a local json or SQLite file.

### Things to think about

- using a framework that you think is best for the task and one that you are comfortable with.
- adding unit testing in your application.
- demonstrating your sense of design by adding any elements to help the user know how to use the application.
- writing simple, easy to understand, and well documented code
- creating a container for the application.

## Quick Start Local Guide

0. Configure environment | prerequisite: mapbox account & public token (https://account.mapbox.com/)


```bash
#.env
#replace env variable with public mapbox token
NEXT_PUBLIC_MAPBOX_TOKEN=<YOUR_TOKEN>
```

1. Clean install node packages 

```bash
npm ci
```

2. Build static assets 

```bash
npm run build
```

3. Run app

```bash
docker-compose up --build
# or
npm run dev
```

4. UI access

```bash
open http://localhost:3000/
```

5. Kill | if you are running docker locally, the following command will stop and remove containers, networks and volumes created by `up`

```bash
docker-compose down -v
```

## Testing

```bash
npm run test
```
