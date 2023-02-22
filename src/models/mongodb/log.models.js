module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        type: {
            type: String,
            enum: ['log', 'error'],
            required: true
        },
        function_name: {
            type: String,
            required: true
        },
        message: {
            type: String
        },
        request: {
            type: Object,
            required: false
        },
        response: {
            type: Object,
            required: false
        }
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

    const Log = {
        collectionSchema: schema,
        collectionName: 'logs',
        modelName: 'Log'
    };

    return Log;
};
