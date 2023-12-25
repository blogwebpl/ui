# BlogWeb UI Library

The BlogWeb UI Library is a comprehensive set of React components designed to build modern and responsive web applications. It provides a wide range of customizable UI elements, including tables, forms, and various input controls, all with a focus on ease of use and accessibility.

## Project Goals

- To offer a robust set of UI components for rapid development of web applications.
- To ensure components are accessible and adhere to WCAG guidelines.
- To provide a consistent look and feel across different applications using the library.

## Features

- Pre-styled components for quick integration.
- Storybook integration for interactive component documentation and testing.
- Support for theming and customization.
- Responsive design for mobile and desktop compatibility.
- TypeScript support for type safety and developer experience.

## Installation

To install the BlogWeb UI Library, run the following command:

```bash
npm install @blogwebpl/ui
```

or if you are using Yarn:

```bash
yarn add @blogwebpl/ui
```

## Usage

To use a component from the library, import it into your React component:

```javascript
import { Button } from '@blogwebpl/ui';

const MyComponent = () => (
<Button variant="primary">Click me</Button>
);
```

## Basic Components
Alert
Displays a warning or informational message.

```javascript
<Alert>Important message</Alert>
```

AppBar
Represents the navigation bar of the application.

```javascript
   <AppBar title="Title" handleProfileClick={handleProfileClick} />
```

Button
A button that can be used for interaction.

```javascript
   <Button label="Click me" onClick={handleClick} />
```

ButtonContainer
Container for buttons, allowing for grouping.

```javascript
   <ButtonContainer>
     <Button label="Button 1" />
     <Button label="Button 2" />
   </ButtonContainer>
```

Card
A component used to display content in a framed card.

```javascript
 <Card minWidth="300px">
     <p>Card content</p>
   </Card>
```

CardMenu
A list-style menu that can be used within the Card component.

```javascript
   <CardMenu items={menuItems} />
```

DeviceItem
Displays information about a device, e.g., in a sidebar.

```javascript
   <DeviceItem name="Device 1" deviceId="123" />
```

FieldContainer
Container for form fields, facilitating layout organization.

```javascript
   <FieldContainer>
     <TextField label="Name" />
   </FieldContainer>
```

Form
A form component that can contain various input fields.

```javascript
   <Form onSubmit={handleSubmit}>
     <TextField label="Username" />
   </Form>
```

IconButton
A button with an icon that can be used for interaction.

```javascript
    <IconButton onClick={handleClick}>
      <SomeIcon />
    </IconButton>
```

IconSelect
A special type of dropdown list with icons.
```javascript
    <IconSelect options={options} value={value} onChange={handleChange} />
```

Main
The main container for the application content.

```javascript
    <Main isCovered={true}>
      <p>Main content of the application</p>
    </Main>
```

Menu
A navigation component in the form of a menu.

```javascript
    <Menu items={menuItems} language="en" />
```

Player
Multimedia player with basic controls.

```javascript
    <Player isPlaying={isPlaying} onButtonClick={handleButtonClick} />
```

PlayerSettings
Settings for the player, such as device selection.

```javascript
    <PlayerSettings devices={devices} onLoad={handleLoad} />
```

Select
Dropdown list for selecting options.

```javascript
    <Select options={options} value={value} onChange={handleChange} />
```

Sidebar
A side navigation panel.

```javascript
    <Sidebar isSidebarOpen={isSidebarOpen} />
```

Table
Table component for displaying data.

```javascript
    <Table columns={columns} data={data} />
```

Tabs
Tabs for organizing content into categories.

```javascript
    <Tabs tabs={tabs} setActiveTab={setActiveTab} />
```

TextField
Text field for entering data.

```javascript
    <TextField label="Name" value={value} onChange={handleChange} />
```

Theme
Provides global styles and themes for the application.

```javascript
    <Theme>
      <App />
    </Theme>
```

Tools
A set of tools, such as action buttons in a table.

```javascript
    <Tools actions={actions} />
```

## Development
To start the development environment and view components in Storybook, run:

```bash
npm run storybook
```

## Building

To build the library for production, run:

```bash
npm run build
```

This will generate the dist folder with compiled components ready for deployment.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



