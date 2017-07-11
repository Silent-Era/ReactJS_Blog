import toastr from 'toastr';

export default {
    notify: (message, type="info") => {
        toastr[type](message);
    },
    notifyMany: (errors, type="info") => {
        if (errors.length) {
            errors.forEach(error => {
                toastr[type](error.message);
            });
        }
    }
};
