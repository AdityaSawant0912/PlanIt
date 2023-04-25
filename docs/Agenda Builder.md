# Agenda Builder

[Utilities](https://www.notion.so/Utilities-4aeabef8d4af41ee9f2985cdde49407d)

---

# Modules

## Module > Pages > Functionalities > Explanation

- Home Page

  Home Page

- Session Module

  Login Options :

  - Credentials
  - Google

    Pages:

  - Login (Sign In)

        Simple Form / Button (for Google)

        Form:

    - Email
    - Password

      Options:

    - Forget Password

  - Logout (Sign Out)

        Button / URL

        Won’t be an actual Page, Redirected To Home page

  - Register

        Simple Form / By Google

        Form:

    - First Name
    - Last Name
    - Email
    - Password & Confirm Password

- User Module

  - Profile

        User’s Profile Page

        Functionalities:

    - Display User Information
    - Update Information (If current user == profile user)

  - Dashboard

        User’s Workspace/Board Dashboard

        Landing Page after Login.

        Functionalities:

    - Display User’s Boards and Workspaces
      - Recent
      - User’s Workspaces
      - Guest Workspaces
    - Create new Workspace/Board

- Workspace Module

  - Create New

    - By Template

      - Display Templates

            Let User choose, then

      - Create that particular Workspace

    - Scratch

            Create an Empty Untitled Workspace

      Requires user to change Workspace’s Title (Default: “Untitled”)

  - Dashboard

        Workspace’s Dashboard

    - Display All Boards
      - Sort by starred
      - Sort by recent
    - If Owner

            Show Manage option

            Functionalities:

      - Manage Collaborators
        - Add Collaborators
        - Remove Collaborators

- Board Page

  - Create New

    - Scratch

            Create an Empty Untitled Board without any list.

    - By Template

      - Display Templates

            Let User choose, then

      - Create that particular Board with some lists if template contains any.

        Requires user to change Workspace’s Title (Default: “Untitled”)

  - Views

    - Board View (Default)

            Like a Kanban Board.

            N no of Lists can be created.

            List will be stacked horizontally.

            List will contain Cards.

            Cards will be stacked vertically inside their parent List.

            Filter By Attributes.

            Lists and Cards and explained in detail later.

    - Table View

            All cards are shown Vertically in a Tabular format.

            All the relevant attributes are shown. (Visibility of attributes can be modified by User)

            Filter By Attributes.

    - Calendar View (TBD)

            Types:

      - Day
      - Week
      - Month
      - Year

            Cards will be shown According to Due Date (If any).

            If provided with Start Date:

            That particular card will be shown on all days between start and due.

    Managed by Owner.

    Filterable by any attribute in any view.

    Each board has set of Labels, which can be applied to cards.

---

<br/>

# Lists

For simplicity: List is nothing but another Label/Attribute for a card.

A Card is mainly categorized by it List.

There can be N no of Lists in a board.

---

# Cards

## Cards are the heart of this whole project

A card is an entity which has a parent list.

A card can have (\* compulsory)

- Title \*
- Description
- Start Date
- Due / End Date
- Duration
- Labels
- Type
- Mode
- Contact
- Owner
- Assigned to User

---
