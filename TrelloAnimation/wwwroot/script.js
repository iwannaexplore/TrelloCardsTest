let draggables;
let wrappers;
function Initialize(){
    draggables = document.querySelectorAll('.draggable-element');
    wrappers = document.querySelectorAll('.board-wrapper');
    draggables.forEach(draggable => {
        let movableClone;
        draggable.addEventListener('dragstart', (e) => {
            movableClone = e.target.cloneNode(true);
            draggable.classList.add('dragging');
            
            movableClone.style.position = "absolute";
            movableClone.style.top = "0px";
            movableClone.style.left = "-400px";


            let inner = movableClone.getElementsByClassName("inner")[0];
            inner.style.transform = "rotate(5deg)";

            document.body.appendChild(movableClone);
            e.dataTransfer.setDragImage(movableClone, 20, 20);
        }, false);

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
            movableClone.remove();
        })
    })

    wrappers.forEach(wrapper => {
        wrapper.addEventListener('dragover', e => {
            e.preventDefault()
            let container = wrapper.querySelector('.board-content')
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')
            if (afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
        })
    })
}


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable-element:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;
       
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}