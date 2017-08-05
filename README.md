# Coding Task

The goal is to create a web application that visualises a small social network using some Twitter data.

## Data

The people in the network are represented by their integer IDs. There is only one kind of relationship between people: the following relationship. Person A following person B is represented as a two-element array: [idOfA, idOfB]. People in a social network can participate in discussons of some topics. Each topic is represented by a tag like "#programming". So each person can have a list of tags representing the topics in which they have been involved.

## Getting Data

We have prepared two simple functions for you to access the data. They are contained in the JavaScript file `store.js` packed with this coding task. After including this file into your web page, you will have a global object `window.store` which contains two function members:

    /**
     * Fetches a list of 10 random following relations in the network.
     *
     * If the successFn argument is provided, it is used as a callback function
     * which accepts the resulting data as its argument. If the successFn argument
     * is not provided, this function will return a Promise object which will be
     * resolved with the resulting data.
     *
     * The resulting data will look like this: [[7136782, 15903746], [1807861, 1374411], ...]
     *
     * @param {function} [successFn] - The optional callback function.
     * @return {?Promise}
     */
    function sample(sucessFn)

    /**
     * Get the list of tags of each person represented by their ID.
     *
     * If both the successFn argument and the failureFn argument are provided,
     * the successFn argument is used as a callback function which accepts the
     * resulting data as its argument, and the failureFn argument is used as
     * an error handler which accepts an Error object. If either of them is not
     * provided, this function will return a Promise object which will be resolved
     * with the resulting data or rejected with an Error object.
     *
     * The resulting data will look like:
     * [["#worldpeace", "#newyear"], ["@ruby", "#python", "@java"], ...]
     * which has the same length as the number of IDs provided in the ids argument.
     *
     * @param {number[]|string} ids - Either an array of integers or a string of
     *                                comma-seperated integers like "1,2,3".
     * @param {function} [sucessFn] - The optional callback function for resulting data.
     * @param {function} [failureFn] - The optional callback function for error handling.
     */
    function tags(ids, sucessFn, failureFn)

## Environment

Two files are provided along with this coding task: `store.js` and `index.html`. The 'index.html' page is simply a demo of using `store.js`. You can start your coding from there. However, you can use any framework you wish to construct the app.

## Requirements

Please create a single page web application with the following functions:

1. An ADD button that can compose a social network by drawing samples from `store.js`. Repeatedly drawing samples should grow the social network.
2. A CLEAR button that can clear the social network data to restart composing.
3. A visualization of the social network.
4. A visualization of one statistic about the social network: tag frequencies. That is, for the current social network, display the aggregated tag frequencies of the whole network.
