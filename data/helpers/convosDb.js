const db = require('../db.js');

module.exports = {
    getQueue,
    deQueue,
    getActive,
    closeConvo
}

// Get conversation info to populate Queue using signed-in rep's uid
function getQueue(uid) {
    const query = db
        .select([
            "representatives.name as rep_name",
            "representatives.company_id as rep_company_id",
            "conversations.id as convo_id",
            "conversations.customer_uid",
            "conversations.summary",
            "customers.name as customer_name"
        ])
        .from("representatives")
        .innerJoin("conversations", "representatives.company_id", "conversations.company_id")
        .innerJoin("customers", "conversations.customer_uid", "customers.uid")
        .where("representatives.uid", uid)
        .where("conversations.in_q", true);

    return query.then(details => {
	    return details;    // return full array of objects returned by query
	});
}

// Remove a conversation from the Queue by changing in_queue boolean to false
function deQueue(id) {
    return db('conversations')
        .where('id', id)
        .update({ in_q: false });
};

// Get conversation info to poppulate ActiveConvos using signed-in rep's uid
function getActive(uid) {
    const query = db
        .select([
            "representatives.name as rep_name",
            "representatives.company_id as rep_company_id",
            "conversations.id as convo_id",
            "conversations.customer_uid",
            "conversations.summary",
            "customers.name as customer_name"
        ])
        .from("representatives")
        .innerJoin("conversations", "representatives.company_id", "conversations.company_id")
        .innerJoin("customers", "conversations.customer_uid", "customers.uid")
        .where("representatives.uid", uid)
        .where("conversations.in_q", false)
        .where("conversations.is_open", true);

    return query.then(details => {
	    return details;    // return full array of objects returned by query
	});
}

function closeConvo(id) {
    return db('conversations')
        .where('id', id)
        .update({ is_open: false });
};