import $ from 'jquery'

const baseUrl = 'http://localhost:3001'
const defaultOptions = {
    contentType: 'application/json'
};

export default {
    get: (endpoint, options = defaultOptions) => {
        return $.post({
            url: `${baseUrl}${endpoint}`,
            contentType: options.contentType
        });
    },
    post: (endpoint, data, options = defaultOptions) => {
        return $.post({
            url: `${baseUrl}${endpoint}`,
            data: data,
            contentType: options.contentType
        });
    }
}
