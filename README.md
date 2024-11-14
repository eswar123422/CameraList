# CameraTable Component

This is a React component that displays a table of cameras with features for searching, filtering by status and location, and pagination. The component fetches data from an API and allows users to interact with camera statuses and page through the data.

## Features
- **Search**: Allows users to search cameras by name.
- **Status Filter**: Filter cameras based on their status (Active or Inactive).
- **Location Filter**: Allows users to filter cameras based on location.
- **Pagination**: Displays a paginated list of cameras, with controls to navigate between pages and select the number of items per page.
- **Camera Status Update**: Users can toggle the camera status between Active and Inactive.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/eswar123422/Camera-List.git
    ```

2. Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. **Running the application locally**:

    After installing the dependencies, you can start the application:

    ```bash
    npm start
    ```

    This will start the application in development mode. You can open it in your browser at `http://localhost:3000`.

2. **API Integration**:

    The `CameraTable` component fetches data from an external API (`https://api-app-staging.wobot.ai/app/v1/fetch/cameras`). Make sure to replace the `Authorization` header with a valid token for production use.

3. **Search**:

    - The search input field allows users to filter cameras by name. The search results update dynamically as users type.

4. **Filters**:

    - **Location**: The location filter lets users select from a list of available camera locations.
    - **Status**: The status filter allows users to filter cameras based on their status (Active or Inactive).

5. **Pagination**:

    - Users can navigate through pages using the pagination controls.
    - The number of items per page can be adjusted using the dropdown selector.

6. **Updating Camera Status**:

    - The camera status can be toggled between Active and Inactive by clicking on the status button.

## File Structure

```plaintext
src/
  ├── components/
  │   └── CameraTable.js   # CameraTable component
  ├── assets/              # Static assets like icons
  │   ├── location.svg
  │   ├── status.svg
  │   ├── active.svg
  │   ├── Vector.svg
  │   └── Edge.svg
  └── App.js               # Main application entry point
  └── index.js             # Renders the App component into the DOM
  └── App.css              # Global styles
