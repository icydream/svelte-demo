import Loader from '../component/Loader.svelte';
import Notify from '../component/Notify2.svelte';

const wrap = (data, type) => {
    let obj = {data, type};

    obj.success = handler => {
        handler(obj.data);
        return obj;
    };
    obj.fail = obj.success;

    return obj;
};
const invokeAPI = (url, parameters = {}, whatIsSuccess = resp => resp.ok, message = result => result.type === 'fail' ? result.data : '呼叫API成功') =>
    Promise.resolve((() => {
        let loader = new Loader({
            target: document.body,
            props: {
                visible: true
            }
        });
        let notify = new Notify({
            target: document.body
        });

        return {
            loader,
            notify,
            startTime: Date.now()
        };
    })())
    .then(({loader, notify, startTime}) => {
        let config = {};
        let result;

        if(!!Object.keys(parameters).length) {
            config.body = JSON.stringify(parameters);
        }

        return fetch(url, config)
            .then(resp => {
                if(whatIsSuccess(resp)) {
                    result = wrap(resp.json(), 'success');
                    result.fail = () => result;
                } else {
                    result = wrap('呼叫api發生錯誤', 'fail');
                    result.success = () => result;
                }

                return result;
            }, error => {
                result = wrap(`呼叫api發生錯誤: ${error.message ?? ''}`, 'fail');

                result.success = () => result;

                console.dir(error);

                return result;
            })
            .finally(() => {
                window.setTimeout(() => {
                    loader.$set({visible: false});
                    notify.$set({
                        visible: true,
                        type: result.type,
                        message: message(result)
                    });
                    
                }, 3000-Date.now()+startTime);
            });
        });

export {invokeAPI};