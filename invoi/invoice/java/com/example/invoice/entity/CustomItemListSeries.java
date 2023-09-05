package com.example.invoice.entity;
import java.io.IOException;
import java.util.List;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class CustomItemListSeries extends JsonSerializer<List<item>> {
	@Override

	public void serialize(List<item> items, JsonGenerator gen, SerializerProvider serializers) throws IOException {

		gen.writeStartArray();

		for (item item : items) {

			gen.writeStartObject();

			gen.writeNumberField("id", item.getId());

			gen.writeStringField("itemName", item.getItemName());

			gen.writeNumberField("price", item.getPrice());

			gen.writeNumberField("quantity", item.getQuantity());

			gen.writeNumberField("subtotal", item.getSubtotal());

			gen.writeNumberField("gstAmount", item.getGstAmount());

			gen.writeNumberField("totalAmount", item.getTotalAmount());

			gen.writeEndObject();

		}

		gen.writeEndArray();

	}

}
