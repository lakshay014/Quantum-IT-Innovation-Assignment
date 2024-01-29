const generateRandomDate = () => {
    const startDate = new Date(2022, 0, 1); // Start date for random date generation
    const endDate = new Date(); // Current date as end date
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
  };
  
  const generateRandomRole = () => {
    const roles = ["Manager", "Engineer", "Analyst", "Developer", "Designer"];
    return roles[Math.floor(Math.random() * roles.length)];
  };
  
  const generateRandomStatus = () => {
    const statuses = ["Active", "Inactive"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  
  const generateRandomActions = () => {
    return "Edit, Delete";
  };
  
  const generateRandomElement = (index) => {
    return {
      "#": index + 1,
      "Name": `User ${index + 1}`,
      "Email": `useer${index + 1}@example.com`,
      "Role": generateRandomRole(),
      "Status": generateRandomStatus(),
      "Actions": generateRandomActions(),
      "DateCreated": generateRandomDate()
    };
  };
  
const arr = [];
  
for (let i = 0; i < 100; i++) {
    arr.push(generateRandomElement(i));
}

module.exports ={arr}