using System.ComponentModel.DataAnnotations;

namespace Anotacoes.Models
{
    public class Nota
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}