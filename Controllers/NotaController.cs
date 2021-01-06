using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using Anotacoes.Models;
using Anotacoes.Data;

namespace Anotacoes.Controllers
{
    [ApiController]
    [Route("nota")]
    public class NotaController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Nota>>> ReadAll([FromServices] DataContext db)
        {
            var nota = await db.Notas.ToListAsync();
            return nota;
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Nota>> Create([FromBody] Nota model, [FromServices] DataContext db)
        {
            db.Notas.Add(model);
            await db.SaveChangesAsync();
            return model;
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Nota>> Update([FromBody] Nota model, [FromServices] DataContext db, int id)
        {
            if (id != model.Id) return BadRequest();
            db.Entry(model).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(ReadAll), new { id = model.Id }, model);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<Nota>> Delete([FromServices] DataContext db, int id)
        {
            var nota = await db.Notas.FindAsync(id);
            if (nota == null) return BadRequest();
            db.Notas.Remove(nota);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}