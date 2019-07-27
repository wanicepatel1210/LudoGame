var members = [
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    }
];

let names = members.map((u, index) => {
    return [<section key={index} className="tiles">
        <p>created by <b>{u.name}</b></p>
        <p>2 player joined</p>
        <button type="button" name="button" className="join">Join</button>
        </section>];
});

ReactDOM.render(names,
  document.getElementById('gridTiles'));
