using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace TrelloAnimation.Pages;

public partial class Index
{
    private List<Board> Boards { get; set; }

    protected override void OnInitialized()
    {
        Boards = new List<Board>()
        {
            new Board()
            {
                Title = "Main", Tasks = new List<UTask>()
                {
                    new UTask() { Text = "Sleep" },
                    new UTask()
                    {
                        Text = "Work out"
                    },
                    new UTask() { Text = "Play games" }
                }
            },
            new Board()
            {
                Title = "Life", Tasks = new List<UTask>()
                {
                    new UTask() { Text = "Listen to music" },
                    new UTask() { Text = "Delete C disk" },
                    new UTask() { Text = "Find gold" }
                }
            }
        };
    }

    [Inject] public IJSRuntime JsRuntime { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JsRuntime.InvokeVoidAsync("Initialize");
        }
    }
}
public class Board
{
    public int Id { get; set; }
    public string Title { get; set; }
    public List<UTask> Tasks { get; set; }
}
public class UTask
{
    public int Id { get; set; }
    public string Text { get; set; }
    public int IndexInBoard { get; set; }
    public Board Board { get; set; }
    public int BoardId { get; set; }
}
