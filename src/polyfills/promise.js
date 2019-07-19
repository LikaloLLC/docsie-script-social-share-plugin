(function (self) {
  self.___await = class Await {
    constructor(executionFunction) {
      this.promiseChain = [];
      this.handleError = () => { };
      this.onResolve = this.onResolve.bind(this);
      this.onReject = this.onReject.bind(this);
      executionFunction(this.onResolve, this.onReject);
    }

    then(onResolve) {
      this.promiseChain.push(onResolve);
      return this;
    }

    fail(handleError) {
      this.handleError = handleError;
      return this;
    }

    onResolve(value) {
      let storedValue = value;
      try {
        for (let i = 0; i < this.promiseChain.length; i++) {
          storedValue = this.promiseChain[i](storedValue);
        }
      } catch (error) {
        this.promiseChain = [];
        this.onReject(error);
      }
    }

    onReject(error) {
      this.handleError(error);
    }
  };
})(window);