(function() {
    let type = document.getElementById('equipmentType');
    let model = document.getElementById('model');

    const cameras = {
        lex: 'Bolex Paillard H8',
        yshica: 'Yashica 30',
        pthescape: 'Pathescape Super-8 Relax',
        cnon: 'Canon 512'
    };
    const projectors = {
        kdak: 'Kodak Instamatic M55',
        blex: 'Bolex Sound 715',
        emig: 'Eumig Mark S',
        snkyo: 'Sankyo Dualux'
    };

    const headphones = {
        sane: 'Snamon XI8776',
        bigos: 'Sony XMH9300',
        cvev: 'Emagoe s201',
        hwye: 'Cnadan hiel'
    };


    addEvent(type, 'change', function() {
        if (this.value === 'choose') {
            type.innerHTML = '<option>Please select a type</option>';
            return;
        }
        let models = getModels(this.value);
        let options = '<option>Please select a model</option>';
        for (let key in models) {
            options += '<option value ="' + key + '">' + models[key] + '</option>';
        }
        model.innerHTML = options;
    });


    function getModels(equipmentType) {
        switch (equipmentType) {
            case 'cameras':
                return cameras
                break;
            case 'projectors':
                return projectors;
                break;
            case 'headphones':
                return headphones;
                break;
            default:
                console.log("Sorry, we don't have this value.");
        }
    }
})();


//首先，type的 键值对已经在html页面里呈现出来了
//所以我们需要考虑的事，当type 选择的时候怎么 关联到 他的 model选项
//  然后我改用了swith 一切都挺好的