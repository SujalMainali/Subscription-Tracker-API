export const generateEmailTemplate = async (subscription) => {
    const emailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>...</head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Subscription Tracker</h1>
                </div>
                <div class="content">
                    <h2>Reminder: Upcoming Subscription Renewal</h2>
                    <p>Dear ${subscription.user.name},</p>
                    <p>This is a friendly reminder that your subscription for <strong>${subscription.name}</strong> is due for renewal on <strong>${subscription.renewalDate}</strong>.</p>
                    <p>Here are the details of your subscription:</p>
                    <ul>
                        <li><strong>Price:</strong> ${subscription.price} ${subscription.currency}</li>
                        <li><strong>Frequency:</strong> ${subscription.frequency}</li>
                        <li><strong>Category:</strong> ${subscription.category}</li>
                    </ul>
                    <p>If you wish to make any changes to your subscription, please click the button below:</p>
                    <p><a href="#" class="button">Manage Subscription</a></p>
                    <p>Thank you for using Subscription Tracker!</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Subscription Tracker. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    return emailTemplate;
    
};