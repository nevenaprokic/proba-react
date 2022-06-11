import "./AdventureProfilePage.scss" ;
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EuroIcon from '@mui/icons-material/Euro';


function PriceList({priceData}){

    function createData(name, price) {
        return { name, price };
      }
    const rows = [
        createData('Lunch', 159 ),
        createData('Boating', 237),
        createData('Breakfast', 262),
        createData('Dinner', 305),
        createData('Tennis', 356),
      ];

    return(
        <div className="pricesContainer">
            <div>
                <div className="boxItem">
                <EuroIcon color="action"  sx={{fontSize: "30px", marginTop:"2px"}}/>
                </div>
                <label className="priceListTittle"> Pricelist</label>
               
            </div>
            <div className="basePrice">
                <label>Osnovna cena: {priceData.price} €</label>
            </div>
            
            <div className="tableContainer">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                    <TableRow>
                        <TableCell sx={{fontWeight:"bold", color:"#99A799"}}>Additional service</TableCell>
                        <TableCell sx={{fontWeight:"bold", color:"#99A799"}} align="left">Price €</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            
        </div>
    );
}

export default PriceList;