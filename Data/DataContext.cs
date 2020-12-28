using Anotacoes.Models;
using Microsoft.EntityFrameworkCore;

namespace Anotacoes.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Nota> Notas {get; set;}
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}